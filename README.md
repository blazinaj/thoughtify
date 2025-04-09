# Thoughtify

Thoughtify is a Web Application for managing thoughts, extracting insights, and generating journals.

## Getting Started

### Install AWS Amplify CLI

`npm install -g @aws-amplify/cli`

### Configure AWS Amplify CLI

`amplify configure`

### Install Dependencies

`npm install`

### Start the Application

`npm start`

### File Structure

```

src
├── contexts
├── demo
├── dev
├── layouts
├── locales
├── models
├── pages
├── theme
├── ui-components
├── utils
├── views


```

`/src/demo` - contains the Minimal UI kit used as a base template for the application. Keep demo code pure, used as templates

`/src/layouts` - contains the layout components used to render the application

`/src/layouts/marketing` - contains the marketing website portion of the application.

`/src/layouts/application` - contains the application portion of edify.

`/src/contexts` - contains the react context components for the application

`/src/locales` - contains the translations for the application

`/src/models` - contains the amplify cli data models for the application

`/src/pages` - contains the page components for the application. Used in conjunction with the `routes.js` file to generate pages

`/src/theme` - contains the theme configuration for the application

`/src/ui-components` - auto-generated aws amplify studio react UI components for the application

`/src/utils` - contains the utility functions for the application

`/src/views` - contains the view components for the application. A Page is made up of one or more View components.

## Lessons

A Lesson consists of a series of Lesson Topics.

Each Topic may be one of:

- Slideshow
- Video
- Rich Text

### Examples

Lesson: "Web Development: Level 1"

- Topic 0: "Introduction to Web Development"
- Topic 1: "HTML Basics"
- Topic 2: "CSS Basics"
- Topic 3: "Javascript Basics"
- Topic 4: "React Basics"
- Topic 5: "Node Basics"
- Topic 6: "Full Stack Web Development"
