import { useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Badge, Calendar, Button, Form, Input, DatePicker, Select } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import type { BadgeProps, DatePickerProps, SelectProps } from "antd";
import CustomModal from "../../components/Modal/CustomModal";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Index = () => {
  const { cdid } = useParams();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  console.log(cdid);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    setOpenModal(true);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "Reparación equipo." },
          { type: "success", content: "Cita con cliente LALA" },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "Repacación de equipo" },
          { type: "success", content: "Repacación de equipo" },
          { type: "error", content: "Repacación de equipo" },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "Repacación de equipo" },
          { type: "success", content: "Repacación de equipo" },
          { type: "error", content: "Repacación de equipo" },
          { type: "error", content: "Repacación de equipo" },
          { type: "error", content: "Repacación de equipo" },
          { type: "error", content: "Repacación de equipo" },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <CustomModal
        open={openModal}
        title={`Editar el evento del: ${selectedValue}`}
        footer={false}
        close={setOpenModal}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={() => setOpenModal(false)}
          // initialValues={{ layout: formLayout }}
          // onValuesChange={onFormLayoutChange}
          // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
        >
          <Form.Item label="Titulo del evento">
            <Input placeholder="Descripción breve de la actividad a agendar" />
          </Form.Item>
          <Form.Item label="Fecha a realizar la actividad">
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Asignar persona que realizara la actividad">
            <Select
              style={{ width: "100%" }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Form.Item>
          <Form.Item label="Actividades a realizar">
            <Select
              allowClear
              mode="tags"
              style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Estado del evento agendado">
            <Select
              defaultValue="lucy"
              style={{ width: "100%" }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Iniciado" },
                { value: "lucy", label: "No iniciado" },
                { value: "Yiminghe", label: "En proceso" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                type="primary"
                style={{ marginLeft: 20 }}
                htmlType="submit"
              >
                Submit
              </Button>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
      </CustomModal>
      <Calendar
        cellRender={cellRender}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </>
  );
};

export default Index;
