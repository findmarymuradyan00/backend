function generate(title) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
        </body>
        </html>
    `;
}

module.exports={generate}
