import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
  Layout,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Card,
  Typography,
  message,
} from 'antd';
import {
  DashboardOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// ✅ Import API functions
import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../api/api';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== 'admin') {
      message.error('You are not an admin!');
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllDestinations();
        setDestinations(res.data);
      } catch (err) {
        console.error(err);
        message.error('Failed to fetch destinations');
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Price (USD)', dataIndex: 'price', key: 'price' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingDestination(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            className="ml-2"
            onClick={async () => {
              if (window.confirm('Delete this destination?')) {
                try {
                  await deleteDestination(record.id);
                  message.success('Deleted successfully!');
                  fetchDestinations();
                } catch (err) {
                  message.error('Failed to delete destination');
                }
              }
            }}
          />
        </>
      ),
    },
  ];

  const handleAddOrEdit = async (values) => {
    try {
      if (editingDestination) {
        await updateDestination(editingDestination.id, values);
        message.success('Updated successfully!');
      } else {
        await createDestination(values);
        message.success('Added successfully!');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingDestination(null);
      fetchDestinations();
    } catch (err) {
      message.error('Error saving destination');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl">
        Loading...
      </div>
    );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#006400' }}>
        <div className="p-4 text-white text-center text-2xl font-bold">
          🇪🇹 Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={[
            { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: '2', icon: <PlusOutlined />, label: 'Destinations' },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow px-6 flex items-center justify-between">
          <Title level={4} className="m-0 text-et-green">
            Admin Panel - Explore Abyssinia
          </Title>
          <Button onClick={() => navigate('/dashboard')}>
            Back to User Dashboard
          </Button>
        </Header>

        <Content className="p-8 bg-gray-100">
          <Card>
            <div className="flex justify-between mb-6">
              <Title level={3}>Manage Destinations</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Add New Destination
              </Button>
            </div>

            <Table
              dataSource={destinations}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Content>
      </Layout>

      <Modal
        title={editingDestination ? 'Edit Destination' : 'Add New Destination'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingDestination(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEdit} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (USD)"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Admin;
