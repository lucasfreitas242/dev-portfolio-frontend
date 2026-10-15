import type { Metadata } from "next";
import { Suspense } from "react";
import { EditPostClient } from "./EditPostClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Editar Artigo",
  description: "Painel de edição de artigo do CMS",
};

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

async function EditPostLoader({ params }: EditPostPageProps) {
  const { id } = await params;
  return <EditPostClient id={id} />;
}

export default function EditPostPage(props: EditPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        </div>
      }
    >
      <EditPostLoader params={props.params} />
    </Suspense>
  );
}
