var panel = require('./panel')
var input = require('../input')

module.exports = function(opts) {
  opts = opts || {}

  var button         = panel(opts)
  button.hover       = opts.hover
  button.pressed     = opts.pressed

  button.draw        = draw
  button.drawHover   = drawHover
  button.drawPressed = drawPressed

  return button
}

function draw(ctx) {
  if (inbounds(input.mouseX, input.mouseY, this.getX(), this.getY(), this.getWidth(), this.getHeight())) {
    if (input.mouseLeft) {
      this.drawPressed(ctx)
    } else {
      this.drawHover(ctx)
    }
  } else
    this.drawBackground(ctx)
  this.drawChilds(ctx)
}

function drawHover(ctx) {
  if (this.hover) {
    ctx.beginPath()
    ctx.fillStyle = this.hover
    ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    ctx.fill()
  }
}

function drawPressed(ctx) {
  if (this.pressed) {
    ctx.beginPath()
    ctx.fillStyle = this.pressed
    ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    ctx.fill()
  }
}

function inbounds(xT, yT, x, y, width, height) {
  if (xT < x) return false
  if (yT < y) return false
  if (xT > x + width) return false
  if (yT > y + height) return false
  return true
}