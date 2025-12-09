import { UserMenu } from "./auth/UserMenu";

export const Header=()=>{return(
    <header className="p-4 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold text-blue-800">
          CodeBridge Solutions
        </div>
        <UserMenu />
      </div>
    </header>
)}
