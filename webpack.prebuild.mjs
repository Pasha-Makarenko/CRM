import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

imagemin(['src/img/*.{jpg,jpeg,png,gif}'], {
	destination: 'src/img',
	plugins: [
		imageminWebp({quality: 60})
	]
})