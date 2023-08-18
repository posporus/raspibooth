
type HeroProps = {
    children: preact.ComponentChildren;
  };
  
  export default function Hero({ children }: HeroProps) {
    return (
      <div
        class="h-full w-full "
      >
        {children}
      </div>
    );
  }