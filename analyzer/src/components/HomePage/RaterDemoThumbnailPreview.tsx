import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

const RaterDemoThumbnailPreview = () => {
  return (
    <>
      <section className="bg-black w-full min-h-96 flex justify-center items-center">
        <LazyLoadImage
          effect="opacity"
          src={'https://i.postimg.cc/90XtYfR8/image.png'}
          className="self-center select-none text-xl font-semibold whitespace-nowrap rounded-lg"
          height="100"
          width="1100"
          alt="Dev.to Rater"
          title="Dev.to Rater"
        />
      </section>
    </>
  )
}
export default RaterDemoThumbnailPreview
