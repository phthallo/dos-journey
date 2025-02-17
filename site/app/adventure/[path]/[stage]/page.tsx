'use client'
import Layers from "@/components/landscape/Layers";
import MapModal from '@/components/map/Modal';
import ProfileModal from '@/components/profile/Modal';
import IslandModal from '@/components/island/Modal';
import dynamic from 'next/dynamic';
import MDXStyleProvider from '@/components/panels/layout/styling/MDXStyleProvider';
import { MapIsOpenContext, ProfileIsOpenContext } from "@/components/island/Modal";
import { AdventureChapter } from '@/types/Pathways';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import STAGE_CONFIG from '@/app/StageConfig';

export default function Stage() {
  const { stage, path } =  useParams<{ path: AdventureChapter, stage: string }>();

  const data = STAGE_CONFIG;
  const currentStage = data[path].find(p => p.id === stage);

  if (!data[path] || !currentStage) {
    notFound();
  }
  
  const SidePanelContent = dynamic(() => import(`@/mdx-content/${path}/${stage}/index.mdx`));
  
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  return (
    <main className="block w-screen h-screen" style={{
      backgroundColor: currentStage!.options?.bgColor || 'white',
    }}> 
      <Layers data={currentStage!}>
        <MDXStyleProvider><SidePanelContent /></MDXStyleProvider>
      </Layers>
      <ProfileIsOpenContext.Provider value = {{profileIsOpen: profileIsOpen, setProfileIsOpen: setProfileIsOpen}}>
        <MapIsOpenContext.Provider value={{mapIsOpen: mapIsOpen, setMapIsOpen: setMapIsOpen}}>
          <IslandModal />
          <MapModal />
          <ProfileModal/>
        </MapIsOpenContext.Provider>
      </ProfileIsOpenContext.Provider>
    </main>
  )
}