import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Features = () => {
  return (
    <>
      <section className="bg-black text-white w-full min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="w-4/5 mx-auto">
          <motion.div
            className="flex w-full mb-4 border-1 border-gray-600 rounded-lg"
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -200, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-10 w-3/5 rounded-lg">
              <div className="flex flex-col space-y-4">
                <motion.div
                  className="w-full h-32 rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: -200, opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="w-full h-full bg-black rounded-lg flex flex-col p-5">
                    <p className="text-white text-lg">
                      After, when we configure our S3 bucket, we will come back
                      to the GitLab to configure our pipeline, which will&nbsp;
                      <span className="text-red-500 line-through">
                        do auto deploy for us whenever we push the new code to
                        the main branch.
                      </span>
                    </p>
                    <p className="text-white text-sm mt-auto">
                      exceeded by 15 words.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="w-full h-32 rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-purple-500"
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
                    <p className="text-white text-sm mt-auto">
                      exceeded by 5 words.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="p-4 w-2/5 flex flex-col justify-center items-left">
              <motion.h1
                className="text-3xl font-bold mb-1"
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 200, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Exceeded sentences.
              </motion.h1>
              <motion.p
                className="mb-4 text-left text-lg text-gray-400"
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 200, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                With just one click.
              </motion.p>
              <Link
                to="/rater"
                className="bg-blue-700  hover:bg-blue-600 duration-300 cursor-pointer text-white font-bold rounded-sm text-center py-3 w-[20%]"
              >
                Scan now
              </Link>
            </div>
          </motion.div>

          <div className="flex w-full space-x-4e">
            <motion.div
              className="w-1/3 flex flex-col items-center h-96 rounded-l-lg border border-gray-700 p-4"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -200, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="self-center text-center flex items-center space-x-3">
                <div>
                  <h3 className="text-2xl font-semibold">Reading Time</h3>
                  <p className="text-gray-500">Find the perfect balance.</p>
                </div>
              </div>
              <img
                src="https://i.postimg.cc/RhK41CBJ/c.png"
                alt="Dev.to Rater"
                className="w-full h-full p-10 object-cover select-none"
              />
            </motion.div>

            <motion.div
              className="w-2/3 flex flex-col items-center h-96 rounded-l-none border-l-0 border border-gray-700 p-4"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 200, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="self-center text-center flex items-center space-x-3">
                <div>
                  <h3 className="text-2xl font-semibold">Word Frequency</h3>
                  <p className="text-gray-500">
                    Repeated words are not problem anymore.
                  </p>
                </div>
              </div>
              <div className="flex justify-center h-full p-8 w-full">
                <img
                  className="select-none"
                  src="https://i.postimg.cc/BbLtrGGJ/c-1-1.png"
                  alt="Dev.to Rater"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
