
export function BackButtonHeader (onBack){
   return (
        <button className="back-btn" onClick={onBack}>
            ← Menu
        </button>
   ) 
}

export function BackButtonGhost (onBack){
   return (
        <button className="ghost" onClick={onBack}>
            Back to menu
        </button>
   ) 
}

export function BottomCredits (){
   return (
        <p className="muted small">Non-commercial, educational fan project. Secret Hitler is by Max Temkin, Mike Boxleiter, Tommy Maranges and Mac Schubert (CC BY-NC-SA 4.0).</p>
   ) 
}
