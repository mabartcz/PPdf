const { jsPDF } = require("jspdf"); // will automatically load the node version
const fs = require('fs');
var sizeOf = require('image-size');

//Main directory containing directories with photos
var DirName = "dirImages";

//Load dirs
const path2Dirs = fs.readdirSync(DirName, (err, files) => {
    const path2Dirs = [];
    files.forEach((file) => {
        path2Dirs.push(file);
    });
    return path2Dirs;
})

//console.log(path2Dirs);

//For each directory generate pdf
path2Dirs.forEach(subDirName => {

    subDirNameFull = DirName + '/' + subDirName;

    const pathArray = fs.readdirSync(subDirNameFull, (err, files) => {
        const pathArray = [];
        files.forEach((file) => {
        pathArray.push(file);
        });
        return pathArray;
    })

    //console.log(pathArray);

    var imgPath1 = subDirNameFull + '/'+ pathArray[0];
    var imgPath2 = subDirNameFull + '/'+ pathArray[1];
    var imgPath3 = subDirNameFull + '/'+ pathArray[2];
    var imgPath4 = subDirNameFull + '/'+ pathArray[3];

    const img1 = fs.readFileSync(imgPath1);
    const img2 = fs.readFileSync(imgPath2);
    const img3 = fs.readFileSync(imgPath3);
    const img4 = fs.readFileSync(imgPath4);

    //Pdf dimesions
    var pdfWidth = 297;
    var pdfHigh = 210;

    const doc = new jsPDF({
        orientation:"landscape",
        unit: "mm",
        format: [pdfWidth, pdfHigh]
    });


    //Calculate dimenstions and places
    var imgWidth = pdfWidth/2;

    var img1Dim = sizeOf(imgPath1);
    var img2Dim = sizeOf(imgPath2);

    var img3Height = img1Dim.height/(img1Dim.width/imgWidth);
    var img4Height = img2Dim.height/(img2Dim.width/imgWidth);

    //Add images to pdf
    doc.addImage(img1,  0,           0,             imgWidth, 0, null, 'NONE');
    doc.addImage(img2,  imgWidth,    0,             imgWidth, 0, null, 'NONE');
    doc.addImage(img3,  0,           img3Height,    imgWidth, 0, null, 'NONE');
    doc.addImage(img4,  imgWidth,    img4Height,    imgWidth, 0, null, 'NONE');

    //Add dir name to pdf
    doc.setFontSize(12);
    doc.text(subDirName, 2, pdfHigh-1.2)

    //Save pdf
    doc.save("finpdf/" + subDirName + ".pdf"); // will save the file in the current working directory

    console.log(subDirName + " Created !")
})

