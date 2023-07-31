import { useState, useRef } from "react";
import dayjs from "dayjs";
import { Badge, Calendar, Button, Form, Input, DatePicker, Select, Divider, Space } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import type { BadgeProps, DatePickerProps, SelectProps } from "antd";
import type { InputRef } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import CustomModal from "../../components/Modal/CustomModal";
import "dayjs/locale/es";

let index = 0;

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Index = () => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));
  const [showBtnClientUrl, setShowBtnClientUrl] = useState<Boolean>(false);
  const [clientUrl, setClientUrl] = useState<string>("");
  const [loading, setLoading] = useState<any>(false);

  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

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

  const onChangeClientSelect = (value: string) => {
    if (value !== "all") setShowBtnClientUrl(true);
    else setShowBtnClientUrl(false);
  };

  const ShowButtonClienteUrl = () => {
    if (!showBtnClientUrl) return null;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
          onClick={GenerateClientSharedUrl}
          loading={loading}
        >
          Compartir
        </Button>
        {clientUrl === "" ? null : ShowGenerateUrl()}
      </div>
    );
  };

  const GenerateClientSharedUrl = () => {
    setLoading(true);
    setTimeout(() => {
      const newPath = `${window.location.protocol}//${window.location.host}/clientdashboard/testClientCalendarId`;
      setClientUrl(newPath);
      setLoading(false);
    }, 3000);
  };

  const ShowGenerateUrl = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <label style={{ marginRight: 20 }}>{clientUrl}</label>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(clientUrl);
            alert(`${clientUrl}: copiada con exito`);
          }}
        >
          Copiar
        </Button>
      </div>
    );
  };

  return (
    <>
      <CustomModal
        open={openModal}
        title={`Agendar un evento para: ${selectedValue}`}
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
          <Form.Item label="Asignar evento al cliente">
            <Select
              style={{ width: "100%" }}
              placeholder="Selecciona o crea el cliente a asignar el evento"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Añadir nuevo
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginRight: 20 }}>Ver eventos agendados para: </h2>
        <Select
          defaultValue="all"
          style={{ width: "20%" }}
          onChange={onChangeClientSelect}
          options={[
            { value: "all", label: "Todos" },
            { value: "client1", label: "Cliente 1" },
            { value: "client2", label: "Cliente 2" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
        {ShowButtonClienteUrl()}
      </div>
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
