import SpinnerLoading from './Spinner'

export default function LoadData() {
    return (
        <div className="flex flex-col justify-center items-center gap-2 my-6">
            <SpinnerLoading />
            <span className='text-gray-800'>Memuat data...</span>
        </div>
    )
}
