import { Link } from 'react-router-dom'
import MotionWrapper from '../Wrappers/MotionWrapper'

const ExceededSentencesBox = () => {
  return (
    <MotionWrapper.div
      className="flex flex-col lg:flex-row w-full mb-4 border-1 border-gray-600 rounded-lg"
      whileInView={{ x: 0, opacity: 1 }}
      initial={{ x: -200, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="p-10 w-full lg:w-3/5 rounded-lg">
        <div className="flex flex-col space-y-4">
          <MotionWrapper.div
            className="w-full  rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -200, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-full h-full bg-black rounded-lg flex flex-col p-5">
              <p className="text-white text-lg">
                After, when we configure our S3 bucket, we will come back to the
                GitLab to configure our pipeline, which will&nbsp;
                <span className="text-red-500 line-through">
                  do auto deploy for us whenever we push the new code to the
                  main branch.
                </span>
              </p>
              <p className="text-white text-sm mt-auto">
                exceeded by 15 words.
              </p>
            </div>
          </MotionWrapper.div>
          <MotionWrapper.div
            className="w-full rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -200, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="w-full h-full bg-black rounded-lg flex flex-col p-5">
              <p className="text-white text-lg">
                Before running the database migrations, ensure that your
                environment variables are correctly set up to&nbsp;
                <span className="text-red-500 line-through">
                  connect to the PostgreSQL instance.
                </span>
              </p>
              <p className="text-white text-sm mt-auto">exceeded by 5 words.</p>
            </div>
          </MotionWrapper.div>
        </div>
      </div>
      <div className="p-4 w-full lg:w-2/5 mb-5 lg:mb-0 flex flex-col justify-center items-left">
        <MotionWrapper.h2
          className="text-center lg:text-left text-3xl font-bold mb-1"
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Exceeded sentences.
        </MotionWrapper.h2>
        <MotionWrapper.p
          className="mb-4 text-center lg:text-left text-lg text-gray-400"
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          With just one click.
        </MotionWrapper.p>
        <Link
          to="/rater"
          className="bg-blue-700 hover:bg-blue-600 duration-300 cursor-pointer text-white font-bold rounded-sm text-center py-3 lg:w-[20%] w-[40%] m-auto lg:m-0"
        >
          Scan now
        </Link>
      </div>
    </MotionWrapper.div>
  )
}

export default ExceededSentencesBox
