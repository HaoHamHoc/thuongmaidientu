import { auth } from "@/auth";

const DashboardPage = async() => {
    const session = await auth();

    return(
        <div>
            Session: {JSON.stringify(session)}
        </div>
    );
}

export default DashboardPage;