export interface Lead {
  firstName: string
  lastName?: string | null
  email?: string | null
  jobTitle?: string | null
  companyName?: string | null
  countryCode?: string | null
}

export function generateMessageFromTemplate(template: string, lead: Lead): string {
  let message = template
  
  // Define available fields that can be replaced
  const availableFields = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    jobTitle: lead.jobTitle,
    companyName: lead.companyName,
    countryCode: lead.countryCode
  }
  
  // Find all template variables in the format {fieldName}
  const templateVariables = template.match(/\{(\w+)\}/g) || []
  
  for (const variable of templateVariables) {
    const fieldName = variable.slice(1, -1) // Remove { and }
    
    if (fieldName in availableFields) {
      const fieldValue = availableFields[fieldName as keyof typeof availableFields]
      
      if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
        throw new Error(`Missing required field: ${fieldName}`)
      }
      
      message = message.replace(new RegExp(`\\{${fieldName}\\}`, 'g'), fieldValue)
    } else {
      throw new Error(`Unknown field in template: ${fieldName}`)
    }
  }
  
  return message
}
