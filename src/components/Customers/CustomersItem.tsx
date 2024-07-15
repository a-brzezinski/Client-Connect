import { Link } from "@tanstack/react-router";
import { Mail, Phone, User } from "lucide-react";

type CustomerItemProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

const CustomersItem = ({ id, name, phone, email }: CustomerItemProps) => {
  return (
    <Link to={id}>
      <li className="flex items-center justify-between rounded-md bg-violet-300/20 p-3 hover:bg-violet-300/10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <User className="text-violet-300" size={25} />
            <p className="text-xl font-bold text-white">{name}</p>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="text-violet-300" size={25} />
            <p className="text-sm text-slate-200">{email}</p>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="text-violet-300" size={25} />
            <p className="text-sm text-slate-200">{phone}</p>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default CustomersItem;
