class NoiseGenerator {
    constructor(type='bw', width, height) {
        this.type = type;
        this.width = width;
        this.height = height;
    }

    randPixel() {
        var label, value;
        switch (this.type) {
            default:
            case 'bw':
                label = 'rgb'
                value = Math.round(Math.random()) * 255;
        }

        return label + '(' + value + ',' + value + ',' + value + ')';
    }

    setPixelRand(ctx, x, y) {
        ctx.fillStyle = this.randPixel();
        ctx.fillRect(x, y, 1, 1);
    }

    generateNoise(ctx) {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.setPixelRand(ctx, x, y);
            }
        }
    }

    replaceRed(ctx) {
        var data = ctx.getImageData(0, 0, this.width, this.height).data, index, is_red;

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                index = (y*this.width+x)*4;
                is_red = data[index] != 0 &&
                         data[index + 1] != 255 &&
                         data[index + 2] != 255;

                if (is_red) {
                    this.setPixelRand(ctx, x, y);
                }
            }
        }
    }

    deleteEveryOtherPixel(ctx) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        for (var x = 0; x < canvas.width; x++) {
           for (var y = 0; y < canvas.height; y++) {
               if ((x % 2) + (y % 2) == 0) {
                    ctx.fillRect(x, y, 1, 1);;
               }
           }
        }
    }
}

const width = 500, height = 500;

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d', {alpha: false});
canvas.width = width;
canvas.height = height;

var canvas2 = document.createElement('canvas');
canvas2.width = 500;
canvas2.height = 500;
var ctx2 = canvas2.getContext('2d');

var updateForm = document.createElement('div');

var updateCheckbox = document.createElement('input');
updateCheckbox.id = 'updateCheckbox';
updateCheckbox.type = 'checkbox';
updateCheckbox.innerHTML = 'Update';

var updateLabel = document.createElement('label');
updateLabel.htmlFor = 'updateCheckbox';
updateLabel.innerHTML = 'Update';

document.getElementsByTagName('body')[0].append(canvas);
document.getElementsByTagName('body')[0].append(updateForm);
updateForm.append(updateCheckbox);
updateForm.append(updateLabel);

var noiseGenerator = new NoiseGenerator(type='bw', width, height);
noiseGenerator.generateNoise(ctx);
noiseGenerator.deleteEveryOtherPixel(ctx);
setInterval(function() {
    if (updateCheckbox.checked) {
        ctx2.fillStyle = '#FF0000';
        ctx2.font = 'bold 85px Comic Sans MS';
        ctx2.textAlign = 'center';
        ctx2.fillText('Hello', 100, 100)
        noiseGenerator.replaceRed(ctx2);
        ctx.drawImage(canvas2, 0, 0);
        noiseGenerator.deleteEveryOtherPixel(ctx);
    }
}, 100);
