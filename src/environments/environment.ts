export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',  // Base URL without /api prefix
  imageUploadUrl: 'http://localhost:3000/api/upload',
  maxFileSize: 5242880, // 5MB in bytes
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr'],
  features: {
    darkMode: true,
    analytics: false,
    experimentalFeatures: true
  }
}; 