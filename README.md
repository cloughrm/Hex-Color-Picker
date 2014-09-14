## Hex Color Picker

Slide over colors on the top of the page, adjust hue by sliding over the bottom of the page.

## Installing

The first thing you need is a recent NodeJS installation. Head to [http://nodejs.org/]() for your platforms install instructions.

After `node` and `npm` are installed, you need to clone the project and install dependencies:

```
    npm install
    bower install
```

## Running

To run the project, run the following command from the root of the project:

```
    gulp serve
```
Temporary files, such as the compiled LESS, will be put in `.tmp` within the web project.

## Building

To build then serve the release files, run the following command from the root of the web project:

```
    gulp serve
```
To just build the project, run:

```
    gulp build
```
Builds are created in `dist/` within the web project.

## Cleanup

Run:

```
    gulp clean
```
to remove the `.tmp/` and `dist/` folders generated during the build process.

---
Thanks to [Alex Wendland](https://github.com/awendland) for setting up the project template!