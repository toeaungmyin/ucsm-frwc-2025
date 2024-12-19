export default function NotFound() {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    
    return (
        <div className="bg-cyan-600 w-full min-h-screen flex justify-center items-center px-12">
            <div className="text-white flex flex-col gap-2 justify-start items-center">
                <h2 className="text-3xl font-semibold uppercase border-b-2 border-white">
                    Not Found
                </h2>
                <div className="p-4 text-lg font-medium font-roboto gap-4">
                    <div>The address or voter information is invalid.</div>
                    <div>Please scan the welcome ticket again.</div>
                </div>
            </div>
        </div>
    );
}
