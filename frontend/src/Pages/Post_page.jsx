import { useState, useEffect } from "react";
import Posts from "../Components/Posts";

function Post_page() {
    
    return (
        <div className="min-h-screen bg-violet-900 text-slate-900">
            <Posts posts={posts} />
        </div>
    );
}