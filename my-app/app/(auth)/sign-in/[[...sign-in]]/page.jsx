// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return(
//     <div className='flex items-center justify-center h-screen'>
//         <SignIn />
//     </div>
//   )
// }

"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        style={{ top: "10%", left: "15%" }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute w-[30rem] h-[30rem] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        style={{ bottom: "10%", right: "15%" }}
      />

      {/* Clerk SignIn box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
      >
        <SignIn />
      </motion.div>
    </div>
  );
}
