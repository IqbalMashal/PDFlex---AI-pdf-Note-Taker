// "use client";

// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin } from "react-icons/fa";
// import { FiArrowRight } from "react-icons/fi";

// export default function Home() {
//   const { user } = useUser();
//   const createUser = useMutation(api.user.createUser);
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       CheckUser();
//     }
//   }, [user]);

//   const CheckUser = async () => {
//     const result = await createUser({
//       email: user?.primaryEmailAddress?.emailAddress,
//       imageUrl: user?.imageUrl,
//       userName: user?.fullName
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white font-poppins">
//       {/* Navigation */}
//       <motion.nav 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full flex justify-between items-center p-6 bg-blue-800/30 backdrop-blur-md border-b border-blue-700/50 shadow-xl"
//       >
//         <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//           <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
//             PDFlex
//           </span>
//         </motion.div>
//         <div className="flex items-center gap-6">
//           <UserButton appearance={{ variables: { colorPrimary: '#3b82f6' } }} />
//         </div>
//       </motion.nav>

//       {/* Main Content */}
//       <main className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4 py-16">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="space-y-8 max-w-4xl"
//         >
//           <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
//             Transform Your Workflow with
//             <span className="block mt-2 text-7xl">PDFlex</span>
//           </h1>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-xl text-blue-200/90 mb-12 max-w-2xl mx-auto leading-relaxed"
//           >
//             Transform note-taking with <span className="font-semibold text-blue-300">PDFlex</span>. 
//             Use AI to extract, organize, and summarize ideas effortlessly. 
//             Turn documents into insights—fast, smart, and seamless.
//           </motion.p>

//           <motion.div 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex justify-center"
//           >
//             <Button 
//               onClick={() => router.push("/dashboard")}
//               className="text-xl px-12 py-7 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-2xl group"
//             >
//               Get Started
//               <FiArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Animated Footer */}
//       <motion.footer 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="bg-blue-900/30 border-t border-blue-700/50 py-8"
//       >
//         <div className="container mx-auto flex flex-col items-center gap-6">
//           <div className="flex space-x-8">
//             <motion.a
//               whileHover={{ y: -3 }}
//               href="https://github.com/IqbalMashal"
//               target="_blank"
//               className="text-blue-200 hover:text-white transition-colors"
//             >
//               <FaGithub size={28} />
//             </motion.a>
//             <motion.a
//               whileHover={{ y: -3 }}
//               href="https://www.linkedin.com/in/iqbalmashal/"
//               target="_blank"
//               className="text-blue-200 hover:text-white transition-colors"
//             >
//               <FaLinkedin size={28} />
//             </motion.a>
//           </div>
//           <p className="text-blue-300/80 text-sm">
//             © 2024 PDFlex. All rights reserved.
//           </p>
//         </div>
//       </motion.footer>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white font-poppins">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center p-6 bg-blue-800/30 backdrop-blur-md border-b border-blue-700/50 shadow-xl"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
            PDFlex
          </span>
        </motion.div>
        <div className="flex items-center gap-6">
          <UserButton appearance={{ variables: { colorPrimary: '#3b82f6' } }} />
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-4xl"
        >
          <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            Transform Your Workflow with
            <span className="block mt-2 text-7xl">PDFlex</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-200/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform note-taking with <span className="font-semibold text-blue-300">PDFlex</span>. 
            Use AI to extract, organize, and summarize ideas effortlessly. 
            Turn documents into insights—fast, smart, and seamless.
          </motion.p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button 
              onClick={() => router.push("/dashboard")}
              className="text-xl px-12 py-7 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-2xl group"
            >
              Get Started
              <FiArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Animated Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-blue-900/30 border-t border-blue-700/50 py-8"
      >
        <div className="container mx-auto flex flex-col items-center gap-6">
          <div className="flex space-x-8">
            <motion.a
              whileHover={{ y: -3 }}
              href="https://github.com/IqbalMashal"
              target="_blank"
              className="text-blue-200 hover:text-white transition-colors"
            >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/in/iqbalmashal/"
              target="_blank"
              className="text-blue-200 hover:text-white transition-colors"
            >
              <FaLinkedin size={28} />
            </motion.a>
          </div>
          <p className="text-blue-300/80 text-sm">
            © 2024 PDFlex. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}