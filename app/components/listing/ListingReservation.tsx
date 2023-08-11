"use client";
// npm install react-date-range && npm i -D @types/react-date-range
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;

  onChangeDate: (value: Range) => void;
  dateRange: Range;

  onSubmit: () => void;

  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border-[1px]
        border-neutral-200
      "
    >
      <div className="item-center flex gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />
      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>

      <hr />
      <div
        className="
          flex
          items-center
          justify-between
          p-4
          text-lg
          font-semibold
        "
      >
        <div>total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
