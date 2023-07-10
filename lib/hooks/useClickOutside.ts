import {useEffect} from "react";

interface Props {
  handleClickOutside: () => void
}
export const useClickOutside = (props: Props) => {
  const {
    handleClickOutside = () => {}
  } = props;

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
}

export default useClickOutside;