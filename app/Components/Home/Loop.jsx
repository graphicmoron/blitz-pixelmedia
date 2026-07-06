import CurvedLoop from './../../../Components/CurvedLoop';


export default function Loop() {
  return (
<>
<CurvedLoop 
  marqueeText="Shoot ✦ Edit ✦ Deliver ✦ Repeat ✦"
  speed={2}
  curveAmount={-210}
  direction="right"
  interactive
  className="custom-text-style"
/>
</>
  );
}