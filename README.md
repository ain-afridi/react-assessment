
## React Assessment

This project is a React-based Carousel Application built with TypeScript and styled using Tailwind CSS. It implements a smooth vertical carousel for displaying dynamic content without relying on external carousel libraries. Additionally, the project includes a well-defined testing suite created with Jest and React Testing Library.

## Project Structure
```
src/
  ├── __test__/
  │   ├── Carousel.test.tsx
  │   ├── LeftSide.test.tsx
  │   ├── Provider.test.tsx
  │   ├── RightSide.test.tsx
  │   ├── Summary.test.tsx
  ├── components/
  │   ├── Carousel.tsx
  │   ├── LeftSide.tsx
  │   ├── RightSide.tsx
  │   ├── Summary.tsx
  ├── context/
  ├── svgs/
  ├── utils/
  ├── App.tsx
  ├── index.css
  ├── index.tsx


```

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ain-afridi/react-assessment.git
    ```

2. Navigate to the project directory:
    ```
    cd react-assessment
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Project

To run the project locally, use the following command:
```sh
npm start
```

### Building the Project

To build the project for production, use the following command:
```sh
npm run build
```

### Running Tests

To run the tests, use the following command:
```sh
npm test
```

If you encounter any rendering errors while running the tests, you may need to install the following package:
```sh
npm install --save-dev @testing-library/react