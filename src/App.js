import React, { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// import Sample from './navbar';
import ContainerOutsideExample from './navbar'; // Import the PNG file
const MENU = require('./menu.json');
const svgs = require("./header.json")
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfWidth = 595.35;
const pdfHeight = 841.995;

function App() {
  // const sample = <Sample />;
  pdfMake.fonts ={
    pottaOne: {
      normal: 'https://example.com/fonts/fontFile.ttf',
      bold: 'https://example.com/fonts/fontFile2.ttf',
      italics: 'https://example.com/fonts/fontFile3.ttf',
      bolditalics: 'https://example.com/fonts/fontFile4.ttf'
    },
  }

  const docDefinition = {
    
    pageSize: 'A4',
    pageMargins: [ 40, 60, 40, 60 ],

    styles: {
      header: {
        fontSize: 100,
        bold: true
      },
      anotherStyle: {
        italics: true,
        alignment: 'right'
      }
    }
    ,
    background: function(currentPage, pageCount, pageSize){ return [{canvas: [ { type: 'rect', x: 0, y: 0, w: 595 , h: 841,color:"#F1FCE1" } ] }]},
    header: function(currentPage, pageCount, pageSize) {
      // you can apply any logic and return any valid pdfmake element
  
      return [
        {svg: svgs.head,margin: [ 5, 2, 10, 500 ]},
        // { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
        // { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width , h: 100 } ] }
      ]
    },
    
    footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
    
    content: [
      // ...MENU.map(item => ({
      //   ul: item.items.map(i => i.name), 
      //   style: 'item' 
      // }))
      {text: MENU[0].category+'\n',style: 'header' }
    ],
    images: {
      // Use 'HeadImage' as a string instead of the variable
      // HeadImage: HeadImageDataURL,
    },
    styles: {
      header: {
        fontSize: 27,
        bold: true,
        color:"#B41C0C",
      },
      item: {
        margin: [0, 5, 0, 5] // Add margin to the items
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      }
    }
  };
  

  const [url, setUrl] = useState('');

  const createPdf = () => {
    const pdfCreator = pdfMake.createPdf(docDefinition);
    pdfCreator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };

  return (
    <div className="App">
      <button onClick={createPdf}>Submit</button>

      {url && (
        <div><a href={url}>{url}</a></div>
      )}
      </div>
  );
}

export default App;

