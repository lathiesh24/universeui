import React from 'react'

const EcosystemWeb = () => {
  return (
    <div className="mx-auto w-[400px] flex justify-center items-center h-screen">
      <div className="flex flex-col gap-8 justify-center items-center bg-blue-100">
        <div className=" text-center text-white font-medium text-xl ">
          AI-Generated Marketing Campaigns for Targeted Financial Products
        </div>
        <div className='px-8 py-3 rounded-md font-medium bg-blue-200 text-black border-[1px]'>Explore Ecosystem</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-lg">Description</div>
            <div className="text-base">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-lg">Enhancement</div>
            <div>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcosystemWeb
