import { useState, useEffect } from "react";
import Posts from "../Components/Posts";

function Post_page() {
    
    return (
        <div>
            <Posts posts={posts} />
        </div>
    );
}