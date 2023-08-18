"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            absolute
            left-2
            top-6
            text-neutral-500
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        type={type}
        className={`
          peer
          w-full
          border-2
          bg-white
          p-2
          pt-4
          font-light
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : " border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : " focus:border-black"}
          p-4
          pt-6
        `}
      />
      <label
        className={`
          pointer-events-none
          absolute
          top-4
          z-10
          origin-[0]
          -translate-y-4
          scale-75
          transform
          text-sm
          duration-300
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          lg:top-7
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : " text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
