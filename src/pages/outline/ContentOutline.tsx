import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '../../components';

export function ContentOutlinePage() {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="">
        <div className="pb-10">
          <div className="flex items-center justify-between space-y-2 pl-4">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Writer</h2>
          </div>
          <Tabs
            defaultValue="singleKeywordWriter"
            className="h-full space-y-2  p-4"
          >
            <div className="space-between flex items-center  mb-10">
              <TabsList>
                <TabsTrigger value="singleKeywordWriter" className="relative">
                  Single Writer
                </TabsTrigger>
                <TabsTrigger value="multiKeyword">Multi Writer</TabsTrigger>
                <TabsTrigger value="topicalAuthority">
                  Topical Authority Writer
                </TabsTrigger>
                <TabsTrigger value="keywordGapAnalysis">
                  Keyword Gap Analysis Writer
                </TabsTrigger>
                <TabsTrigger value="holisticWriter">
                  Holistic Writer
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator className="my-4" />
            <TabsContent
              value="singleKeywordWriter"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="flex">
                <div className="basis-1/4 space-y-1 pr-4">
                  {/* <SingleKeywordWriter /> */}
                </div>
                <div className="grow pl-20">Canvas Writer</div>
              </div>
            </TabsContent>
            <TabsContent
              value="multiKeyword"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">Multi Keyword Avalanche</div>
              </div>
              <Separator className="my-4" />
            </TabsContent>
            <TabsContent
              value="topicalAuthority"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Topical Authority</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="keywordGapAnalysis"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Keyword Gap Analysis</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="holisticWriter"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Holistic</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="" />
    </div>
  );
}
