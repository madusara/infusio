import { Button } from "../ui/button";

type Props = { quantity: number; onQuantityIncrement: () => void, onQuantityDecrement: () => void };

const QuantityChanger = ({ quantity, onQuantityIncrement, onQuantityDecrement }: Props) => {
//   const handleIncrease = () => {
//     onQuantityChange(quantity + 1);
//   };
//   const handleDecrease = () => {
//     if (quantity > 1) {
//       onQuantityChange(quantity - 1);
//     }
//   };
  return (
    <div className="mt-2 flex items-center gap-1">
      <Button variant="secondary" onClick={onQuantityDecrement}>
        -
      </Button>
      <Button variant="secondary" disabled className="bg-green-200 text-white">
        {quantity}
      </Button>
      <Button variant="secondary" onClick={onQuantityIncrement}>
        +
      </Button>
    </div>
  );
};

export default QuantityChanger;


// import { Button } from "../ui/button";

// type Props = { quantity: number; onQuantityChange: (quantity: number) => void };

// const QuantityChanger = ({ quantity, onQuantityChange }: Props) => {
//   const handleIncrease = () => {
//     onQuantityChange(quantity + 1);
//   };
//   const handleDecrease = () => {
//     if (quantity > 1) {
//       onQuantityChange(quantity - 1);
//     }
//   };
//   return (
//     <div className="mt-2 flex items-center gap-1">
//       <Button variant="secondary" onClick={handleDecrease}>
//         -
//       </Button>
//       <Button variant="secondary" disabled className="bg-green-200 text-white">
//         {quantity}
//       </Button>
//       <Button variant="secondary" onClick={handleIncrease}>
//         +
//       </Button>
//     </div>
//   );
// };

// export default QuantityChanger;
