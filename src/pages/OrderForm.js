import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AddressForm() {
  const [formData, setFormData] = useState({
    nama: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    detail: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/delivery-addresses', formData);
      if (response.status === 200) {
        console.log(response);
        alert('Alamat telah disimpan!');
        setFormData({
          nama: '',
          provinsi: '',
          kabupaten: '',
          kecamatan: '',
          kelurahan: '',
          detail: '',
        });
      } else {
        console.log(response.data);
        alert('Gagal menyimpan alamat.');

      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div>
      <h1>Form Alamat Pengiriman</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nama">
          <Form.Label>Nama Alamat:</Form.Label>
          <Form.Control
            type="text"
            name="nama alamat"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="provinsi">
          <Form.Label>Provinsi:</Form.Label>
          <Form.Control
            type="text"
            name="provinsi"
            value={formData.provinsi}
            onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="kabupaten">
          <Form.Label>Kabupaten / Kota:</Form.Label>
          <Form.Control
            type="text"
            name="kabupaten"
            value={formData.kabupaten}
            onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="kecamatan">
          <Form.Label>Kecamatan:</Form.Label>
          <Form.Control
            type="text"
            name="kecamatan"
            value={formData.kecamatan}
            onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="kelurahan">
          <Form.Label>Kelurahan:</Form.Label>
          <Form.Control
            type="text"
            name="kelurahan"
            value={formData.kelurahan}
            onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="detail">
          <Form.Label>Detail Alamat:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="detail"
            value={formData.detail}
            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Simpan Alamat
        </Button>
      </Form>
    </div>
  );
}

export default AddressForm;
