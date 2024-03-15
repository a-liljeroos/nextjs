import Link from "next/link";
import { tailTornado } from "./_components/utils/tailTornado";

export default function NotFound() {
  return (
    <div className="p-10 😎">
      <h2 className={tailTornado()}> {"> "}Not Found</h2>
      <p className={tailTornado()}>Could not find requested resource.</p>
      <Link className={tailTornado()} href="/">
        Return Home
      </Link>
    </div>
  );
}
