import { Button } from '@/components/ui/button';
import { SimpleEditor } from '@/lib/tiptap/tiptap-templates/simple/simple-editor';
import {
  FORM_FIELDS,
  FORM_LABELS,
  ITINERARY_FIELDS,
} from '@/features/tour-management/components/tour/tour-form.schema';
import { Form, Input } from 'antd';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';

type ItinerarySectionProps = {
  className?: string;
};

export const ItinerarySection = ({ className }: ItinerarySectionProps) => {
  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">
        {FORM_LABELS[FORM_FIELDS.ITINERARY]}
      </h3>

      <Form.List name={FORM_FIELDS.ITINERARY}>
        {(fields, { add, remove }) => (
          <div className="space-y-4">
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="rounded-lg border border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium">Ngày {index + 1}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => remove(name)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>

                <Form.Item
                  {...restField}
                  name={[name, ITINERARY_FIELDS.TITLE]}
                  label="Tiêu đề"
                >
                  <Input placeholder={`Ngày ${index + 1}`} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, ITINERARY_FIELDS.CONTENT]}
                  label="Nội dung"
                >
                  <SimpleEditor />
                </Form.Item>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() =>
                add({
                  [ITINERARY_FIELDS.TITLE]: '',
                  [ITINERARY_FIELDS.CONTENT]: '',
                })
              }
            >
              <PlusCircleIcon className="mr-2 size-4" />
              Thêm ngày
            </Button>
          </div>
        )}
      </Form.List>
    </section>
  );
};
