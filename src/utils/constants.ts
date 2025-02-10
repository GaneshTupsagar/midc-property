export const CONTACT_INFO = {
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917977161299',
  CONTACT_NUMBER: process.env.NEXT_PUBLIC_CONTACT_NUMBER || '+917977161299',
  EMAIL: 'contact@midcproperty.com',
};

export const SOCIAL_LINKS = {
  WHATSAPP: `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`,
  CALL: `tel:${CONTACT_INFO.CONTACT_NUMBER}`,
  EMAIL: `mailto:${CONTACT_INFO.EMAIL}`,
};

export const DEFAULT_MESSAGES = {
  WHATSAPP_INQUIRY: "Hi, I'm interested in MIDC properties",
  WHATSAPP_PROPERTY_INQUIRY: (propertyTitle: string) => `Hi, I'm interested in the property: ${propertyTitle}`,
};
