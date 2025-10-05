
import { useState } from "react";
import { useChatStore } from "@/lib/zustandStore";

interface Props {
    id: string;
}
export default function DeleteChatRoom({ id }: Props) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const deleteChatroom = useChatStore((s) => s.deleteChatroom);
    return (
        <>
            <button className="px-3 py-1 text-lg text-red-500 hover:bg-red-100 dark:text-red-400"
                onClick={() => {
                    setDeleteOpen(true);
                }}
            >
                Delete
            </button>
            {deleteOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
                            Delete Chatroom?
                        </h2>
                        <p className="mb-4 text-slate-700 dark:text-slate-400">Are you sure you want to delete this chatroom? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setDeleteOpen(false)}
                                className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700"
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteChatroom(id);
                                    setDeleteOpen(false);
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >Delete</button>
                        </div>
                    </div>
                </div>  
            )}  
        </>
    );
}        
   
