var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d', {alpha: false});
canvas.width = 500;
canvas.height = 500;

function randPixel() {
    return Math.round(Math.random()) * 255;
}

function generateNoise(ctx) {
    var x, y, number;

    for ( x = 0; x < canvas.width; x++ ) {
       for ( y = 0; y < canvas.height; y++ ) {
           number = randPixel();

           ctx.fillStyle = "rgb(" + number + "," + number + "," + number + ")";
           ctx.fillRect(x, y, 1, 1);
       }
    }
}

function replaceRed(ctx) {
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
        is_red;

    for (x = 0; x < canvas.width; x++) {
       for (y = 0; y < canvas.height; y++) {
           is_red = data[(y*canvas.width+x)*4] != 0 && data[(y*canvas.width+x)*4 + 1] != 255 && data[(y*canvas.width+x)*4 + 2] != 255;
           if (is_red) {
               number = randPixel();

               ctx.fillStyle = "rgb(" + number + "," + number + "," + number + ")";
               ctx.fillRect(x, y, 1, 1);
           }
       }
    }
}

generateNoise(ctx);

setInterval(function() {
    if (updateCheckbox.checked) {
        ctx.fillStyle = "#FF0000";
        ctx.font = 'bold 85px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.fillText('Hello', 100, 100)
        replaceRed(ctx);
    }
}, 100);

var updateForm = document.createElement('div');

var updateCheckbox = document.createElement('input');
updateCheckbox.id = 'updateCheckbox'
updateCheckbox.type = 'checkbox';
updateCheckbox.innerHTML = 'Update';

var updateLabel = document.createElement('label');
updateLabel.htmlFor = 'updateCheckbox'
updateLabel.innerHTML = 'Update'

document.getElementsByTagName('body')[0].append(canvas);
document.getElementsByTagName('body')[0].append(updateForm);
updateForm.append(updateCheckbox);
updateForm.append(updateLabel);
