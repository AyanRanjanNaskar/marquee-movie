
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { SplitText } from "gsap/all";

// const Intro = ({ onFinish }) => {
  

//   useGSAP(() => {
//     const introSplit = new SplitText(".intro", {type: "chars, words"});
//    introSplit.chars.forEach((char) => char.classList.add("self-edited"));

//    gsap.from(introSplit.chars,{
//     yPercent: 100,
//     duration:1,
//     ease:"expo.out",
//     opacity:0,
//     stagger:0.02,
//    })


//   },[onFinish])

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
//     >
//       <h1 className=" intro  text-8xl font-bold">MARQUEE MOVIES</h1>
//     </div>
//   );
// };

// export default Intro;





import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const Intro = ({ onFinish }) => {
  useGSAP(() => {
    const split = new SplitText(".intro", { type: "chars" });
    split.chars.forEach((char) => char.classList.add("self-edited"));
    
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    // Text reveal
    tl.from(split.chars, {
      yPercent: 120,
      duration: 1,
      ease: "expo.out",
      stagger: 0.025,
    })

    // 🎭 FOLD UP EFFECT
    .to(".intro-wrapper", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.9,
      ease: "expo.inOut",
    });
  }, []);

  return (
    <div className="intro-wrapper fixed inset-0 z-50 flex items-center justify-center bg-black text-white origin-top">
      <h1 className="intro text-8xl font-bold">MARQUEE MOVIES</h1>
    </div>
  );
};

export default Intro;

