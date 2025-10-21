type SpinButtonProps = React.ComponentProps<"button">;
function SpinButton({ disabled, ...props }: SpinButtonProps) {
  return (
    <button
      {...props}
      style={{
        cursor: "inherit",
      }}
      className=""
    >
      <img
        src={disabled ? "/spin-disabled.png" : "/spin.png"}
        alt="Spin Button"
        className="size-[96px] rounded-full "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      />
    </button>
  );
}
export default SpinButton;
