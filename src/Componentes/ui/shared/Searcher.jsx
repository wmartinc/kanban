const Searcher = () => {
    return (
        <div className="w-full min-w-32 max-w-72">
            <input type="text" placeholder="Search boards..."
                className="border border-zinc-700 text-sm focus:outline-none w-full
                bg-transparent transition-all duration-300 px-3 py-2 rounded-lg
                focus:border-purple-500/50 text-zinc-300 placeholder:text-zinc-500" 
            />
        </div>
    )
}

export default Searcher;