export const environment = {
  production: true,
  apiUrl: 'https://api.beyondedgelab.com/api',
  imageUploadUrl: 'https://api.beyondedgelab.com/api/upload',
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