import GridImage from '@/assets/svgs/grid.svg';

export function AppGridShapeBackground() {
  return (
    <>
      <div className="absolute top-0 right-0 -z-1 w-full max-w-62.5 xl:max-w-112.5">
        <img src={GridImage} alt="grid" />
      </div>
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-62.5 rotate-180 xl:max-w-112.5">
        <img src={GridImage} alt="grid" />
      </div>
    </>
  );
}
