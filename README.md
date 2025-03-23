# Beyond Edge Lab

A modern web application built with Angular that provides a platform for exploring and visualizing data through advanced AI and machine learning capabilities.

## Features

- 🔐 **Authentication System**
  - User registration and login
  - JWT-based authentication
  - Protected routes
  - Secure session management

- 🎨 **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Dynamic navigation based on user authentication
  - Beautiful animations and transitions

- 🖼️ **Image Processing**
  - Image upload capabilities
  - Interactive image grid
  - Dynamic image information display
  - Visual feedback on interaction

- 🔮 **3D Visualization**
  - Three.js integration
  - Interactive 3D models
  - Real-time rendering
  - Custom visualizer component

## Tech Stack

- **Frontend Framework**: Angular 19
- **Styling**: SCSS with CSS Variables
- **3D Graphics**: Three.js
- **Authentication**: JWT
- **State Management**: RxJS
- **Development Tools**: Angular CLI

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beyond-edge-lab.git
cd beyond-edge-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
beyond-edge-lab/
├── src/
│   ├── app/
│   │   ├── components/         # Reusable UI components
│   │   ├── layout/            # Layout components (header, footer)
│   │   ├── services/          # Angular services
│   │   ├── core/             # Core functionality
│   │   └── shared/           # Shared modules and components
│   ├── assets/               # Static assets
│   └── environments/         # Environment configurations
├── angular.json              # Angular workspace configuration
└── package.json             # Project dependencies
```

## Authentication Flow

1. **Registration**
   - Users can create an account with email, password, and full name
   - Form validation ensures data integrity
   - Automatic login after successful registration

2. **Login**
   - Secure authentication using JWT
   - Protected routes for authenticated users
   - Dynamic navigation based on auth state

## Development

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build --configuration production
```

### Deployment
```bash
npm run deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular team for the amazing framework
- Three.js community for 3D visualization capabilities
- All contributors who have helped shape this project

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/beyond-edge-lab](https://github.com/yourusername/beyond-edge-lab) 