
export function LogoSH({width, height}) {
  const logo = `${import.meta.env.BASE_URL}logoSH.svg`
  return (
    <>
      <img className="logo" img={logo} width={width} height={height} alt="Secret Hitler" />
    </>
  );
}