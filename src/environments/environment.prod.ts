export const environment = {
  production: true,
  apiUrl: 'https://beyond-edge-auth-service-production.up.railway.app/api',
  imageUploadUrl: 'https://beyond-edge-auth-service-production.up.railway.app/api/upload',
  maxFileSize: 5242880, // 5MB in bytes
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  features: {
    darkMode: true,
    analytics: true,
    experimentalFeatures: false
  }
};