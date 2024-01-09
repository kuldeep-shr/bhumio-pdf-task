# 📄 PDF File Comparison

**Description:**
<br>
A simple and easy tool to compare the PDF, whether it's Identical or not.

## Main things we used:
<br>

1. `Typescript[Node JS]`
2. `EJS`(Server Side Rendering) 🎨
3. `pdf-parse` npm library 📜
4. node `fs` module
5. `diff` npm, especially for text comparison (Because Details Matter) 🕵️‍♂️
6. `crypto` npm, generating hash for each file ₿

## Installation Steps:

1. 🌀 Clone the repository,
2. 🛠️ run, `npm install`
3. 💻 Execute `npm run dev` to ensure everything is smooth (for build, use `npm run build`)
4. 🌐 After build, launch the application with `npm start`

## Folder Structure

```
└── 📁bhumio
    └── .env
    └── .gitignore
    └── README.md
    └── 📁fileComparison
        └── 📁src
            └── app.ts
            └── 📁controller
                └── fileUpload.ts
            └── 📁helper
                └── d.ts
                └── deleteFolder.ts
                └── multerStorage.ts
                └── utils.ts
            └── 📁routes
                └── routes.ts
            └── 📁services
                └── text.ts
            └── tsconfig.json
    └── 📁fileComparisonCompiled
        └── 📁src
            └── app.js
            └── 📁controller
                └── fileUpload.js
            └── 📁helper
                └── d.js
                └── deleteFolder.js
                └── multerStorage.js
                └── utils.js
            └── 📁routes
                └── routes.js
            └── 📁services
                └── text.js
    └── global.d.ts
    └── package-lock.json
    └── package.json
    └── tsconfig.json
    └── 📁view
        └── 📁assets
            └── .DS_Store
            └── 📁images
                └── error.gif
        └── compare-styles.css
        └── compare.ejs
        └── error-styles.css
        └── error.ejs
        └── index.ejs
        └── styles.css
```

**NOTE:** <br> **📁 fileComparisonCompiled** is compiled folder, when you compiled the code

### For ENV

1. 🌐 PORT NUMBER {use `PORT`}
2. 📂 FOLDER PATH {use `FILE_PATH`}

#### Need a Wizard's Help?

📩 Contact me at kuldeepsharma8988@gmail.com
