<template>
  <div class="app-container">
    <h1>Ogłoszenie</h1>
    <div class="add-offer-form">
      <el-form
        v-if="!loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        @submit.prevent="onSubmit"
      >
        <Attribute
          name="Pakiet"
          slug="subscription"
          :options="subscriptionList"
          :value="form.subscription"
          placeholder="Wybierz"
          type="select"
          @set-value="form.subscription = $event"
        />
        <Attribute
          name="Status"
          slug="status"
          :options="statusList"
          :value="form.status"
          placeholder="Wybierz"
          type="select"
          @set-value="form.status = $event"
        />
        <OfferType
          :type="form.attributes[1]"
          @set-type="setType"
        />
        <Category
          :category="form.category"
          :subcategory="form.subcategory"
          :root-categories="rootCategories"
          :root-sub-categories="rootSubCategories"
          @set-root-category="setCategory"
          @set-sub-category="form.subcategory = $event"
        />
        <el-row>
          <el-col :span="11">
            <Attribute
              name="Cena"
              slug="price"
              placeholder="0"
              append-info="zł"
              :value="form.price"
              @set-value="form.price = $event"
            />
          </el-col>
          <el-col :span="11">
            <Attribute
              :name="attributes['_3'].name"
              :slug="attributes['_3'].slug"
              :value="form.attributes[3]"
              placeholder="0"
              append-info="zł"
              @set-value="form.attributes[3] = $event"
            />
          </el-col>
        </el-row>

        <div class="line">
          <Attribute
            :name="attributes['_2'].name"
            :slug="attributes['_2'].slug"
            :value="form.attributes[2]"
            type="checkbox"
            @set-value="form.attributes[2] = $event"
          />
          <Attribute
            :name="attributes['_5'].name"
            :slug="attributes['_5'].slug"
            :value="form.attributes[5]"
            type="checkbox"
            @set-value="form.attributes[5] = $event"
          />
          <Attribute
            :name="attributes['_6'].name"
            :slug="attributes['_6'].slug"
            :value="form.attributes[6]"
            type="checkbox"
            @set-value="form.attributes[6] = $event"
          />
          <Attribute
            :name="attributes['_7'].name"
            :slug="attributes['_7'].slug"
            :value="form.attributes[7]"
            type="checkbox"
            @set-value="form.attributes[7] = $event"
          />
          <Attribute
            :name="attributes['_8'].name"
            :slug="attributes['_8'].slug"
            :value="form.attributes[8]"
            type="checkbox"
            @set-value="form.attributes[8] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_4'].name"
            :slug="attributes['_4'].slug"
            :value="form.attributes[4]"
            append-info="m2"
            @set-value="form.attributes[4] = $event"
          />
          <Attribute
            :name="attributes['_9'].name"
            :slug="attributes['_9'].slug"
            :options="attributes['_9'].options"
            :value="form.attributes[9]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[9] = $event"
          />
          <Attribute
            :name="attributes['_10'].name"
            :slug="attributes['_10'].slug"
            :options="attributes['_10'].options"
            :value="form.attributes[10]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[10] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_11'].name"
            :slug="attributes['_11'].slug"
            :options="attributes['_11'].options"
            :value="form.attributes[11]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[11] = $event"
          />
          <Attribute
            :name="attributes['_12'].name"
            :slug="attributes['_12'].slug"
            :options="attributes['_12'].options"
            :value="form.attributes[12]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[12] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_15'].name"
            :slug="attributes['_15'].slug"
            :options="attributes['_15'].options"
            :value="form.attributes[15]"
            type="checkbox_group"
            @set-value="form.attributes[15] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_16'].name"
            :slug="attributes['_16'].slug"
            :options="attributes['_16'].options"
            :value="form.attributes[16]"
            type="checkbox_group"
            @set-value="form.attributes[16] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_17'].name"
            :slug="attributes['_17'].slug"
            :options="attributes['_17'].options"
            :value="form.attributes[17]"
            type="checkbox_group"
            @set-value="form.attributes[17] = $event"
          />
        </div>
        <div class="line">
          <Attribute
            :name="attributes['_18'].name"
            :slug="attributes['_18'].slug"
            :options="attributes['_18'].options"
            :value="form.attributes[18]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[18] = $event"
          />
          <Attribute
            :name="attributes['_19'].name"
            :slug="attributes['_19'].slug"
            :options="attributes['_19'].options"
            :value="form.attributes[19]"
            placeholder="Wybierz"
            type="select"
            @set-value="form.attributes[19] = $event"
          />
        </div>
        <Attribute
          name="Tytuł"
          slug="title"
          :value="form.title"
          @set-value="form.title = $event"
        />
        <Description
          :value="form.description"
          @set-value="form.description = $event"
        />
        <Attribute
          name="Link"
          slug="link"
          placeholder="do youtube, vimeo"
          :value="form.links.video"
          @set-value="form.links.video = $event"
        />
        <Attribute
          name="Link"
          slug="link"
          placeholder="do youtube, vimeo"
          :value="form.links.video_2"
          @set-value="form.links.video_2 = $event"
        />
        <Attribute
          name="Link"
          slug="link"
          placeholder="wirtualnego spaceru"
          :value="form.links.walk_video"
          @set-value="form.links.walk_video = $event"
        />
        <Photo
          :file-list="fileList"
          @on-change="handleChangeImages"
        />
        <Location
          name="Lokalizacja"
          slug="location"
          :value="form.location"
          @set-value="form.location = $event"
        />
        <PublishDate
          :value="form.visibleFromDate"
          @set-value="form.visibleFromDate = $event"
        />
      </el-form>
      <el-button type="primary" @click="onSubmitEdit">Zapisz</el-button>
    </div>
  </div>
</template>

<script>
import CategoryResource from '@/api/category';
import AttributeResource from '@/api/attribute';
import OfferResource from '@/api/offer';
import OfferType from '@/views/offers/form/OfferType';
import Category from '@/views/offers/form/Category';
import PublishDate from '@/views/offers/form/PublishDate';
import Location from '@/views/offers/form/Location';
import Photo from '@/views/offers/form/Photo';
import Description from '@/views/offers/form/Description';
import Attribute from '@/views/offers/form/Attribute';
import permission from '@/directive/permission'; // Permission directive
import { mapOfferModelToOfferForm } from '@/helpers';

const offerResource = new OfferResource();
const categoryResource = new CategoryResource();
const attributeResource = new AttributeResource();

export default {
  name: 'OfferEdit',
  components: {
    OfferType,
    Category,
    Attribute,
    Description,
    Photo,
    Location,
    PublishDate,
  },
  directives: { permission },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Wpisz hasło'));
      } else {
        if (this.form.password !== '') {
          this.$refs.form.validateField('rePassword');
        }
        callback();
      }
    };
    return {
      statusList: [
        { id: 1, name: 'Aktywna', slug: 'active' },
        { id: 2, name: 'Nieaktywna', slug: 'in_active' },
        { id: 3, name: 'Odrzucone', slug: 'rejected' },
      ],
      subscriptionList: [
        { id: 1, name: 'Darmowe', slug: 1 },
        { id: 2, name: 'Standard', slug: 2 },
        { id: 3, name: 'Silver', slug: 3 },
        { id: 4, name: 'Gold', slug: 4 },
      ],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
      rootCategories: {},
      rootSubCategories: {},
      selectedRootSubCategories: {},
      loading: true,
      viewType: 'create',
      zoom: 16,
      showMap: false,
      defaultLatLon: [0, 0],
      locations: [],
      locationsLoading: true,
      offer: {},
      form: {
        title: '',
        category: '',
        subcategory: '',
        subscription: '',
        price: '',
        description: '',
        date: '',
        location: '',
        mainImage: [],
        images: [],
        visibleFromDate: '',
        user: {
          account_type: 'private',
          name: '',
          email: '',
          password: '',
          rePassword: '',
        },
        links: {
          video: '',
          video_2: '',
          walk_video: '',
        },
        attributes: {
          1: 'sprzedaz',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          11: '',
          12: [],
          13: '',
          14: '',
          15: [],
          16: [],
          17: [],
          18: '',
          19: '',
        },
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      mainPhoto: [],
      marker: null,
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        category: { required: true, message: 'Kategoria jest wymagana', trigger: 'change' },
        price: { required: true, message: 'Cena jest wymagana', trigger: 'change' },
        title: { required: true, message: 'Tytuł jest wymagany', trigger: 'change' },
        location: { required: true, message: 'Lokacja jest wymagana', trigger: 'change' },
        description: { required: true, message: 'Opis jest wymagany', trigger: 'change' },
        'user.email': { required: true, message: 'Email jest wymagany', trigger: 'change' },
        'user.password': { required: true, message: 'Hasło jest wymagane', trigger: 'change' },
        'user.rePassword': { required: true, message: 'Powtórz hasło jest wymagane', trigger: 'change' },
        'user.name': { required: true, message: 'Imię lub nazwa firmy jest wymagane', trigger: 'change' },
      },
    };
  },
  async mounted() {
    await this.getAttributes();
    await this.getCategories();
    this.loading = false;
    if (this.$route.query.slug) {
      const result = await offerResource.get(this.$route.query.slug);
      this.viewType = 'update';
      this.form = await this.fillForm(result);
      this.fileList = this.form.images;
      this.offer = result;
    }
  },
  methods: {
    setCategory(e) {
      this.form.category = e;
      if (this.viewType !== 'update') {
        this.form.subcategory = '';
      }
    },
    async getAttributes() {
      this.attributes = await attributeResource.list();
    },
    async getCategories() {
      const categories = await categoryResource.list();
      for (const category of categories) {
        this.rootSubCategories[category.slug] = category.children.map((category) => {
          return { name: category.name, value: category.slug, id: category.id };
        });
      }

      this.rootCategories = categories.map((category) => {
        return { name: category.name, value: category.slug, id: category.id };
      });
    },
    async onSubmitEdit() {
      const formData = this.makeFormData();
      await offerResource.update(this.offer.slug, formData);
      await this.$router.push('/offers/offers');
    },
    makeFormData() {
      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('price', this.form.price * 100);
      formData.append('status', this.form.status);
      formData.append('subscription', this.form.subscription);

      formData.append('lat', this.form.location[0]);
      formData.append('lon', this.form.location[1]);
      formData.append('location_name', this.form.location[2]);
      formData.append('links[video]', this.form.links.video);
      formData.append('links[video_2]', this.form.links.video_2);
      formData.append('links[walk_video]', this.form.links.walk_video);
      formData.append('visible_from_date', this.form.visibleFromDate);

      if (this.form.subcategory !== '') {
        formData.append('category', this.form.subcategory);
      } else {
        formData.append('category', this.form.category);
      }

      for (const attribute in this.form.attributes) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.form.attributes.hasOwnProperty(attribute)) {
          formData.append(`attributes[${attribute}]`, this.form.attributes[attribute]);
        }
      }

      for (const image in this.form.images) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.form.images.hasOwnProperty(image)) {
          formData.append(`images[${image}]`, this.form.images[image].raw);
        }
      }

      return formData;
    },
    setType(type) {
      this.form.attributes[1] = type;
    },
    setUserType(type) {
      this.form.user.account_type = type;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    fillForm(offer) {
      const form = mapOfferModelToOfferForm(offer, this.rootCategories, this.rootSubCategories);
      this.selectedRootSubCategories = this.rootSubCategories[form.category];
      return form;
    },
    handleChangeImages(files) {
      this.form.images = files;
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  display: flex;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.dialog-footer {
  text-align: left;
  padding-top: 0;
  margin-left: 150px;
}
.app-container {
  flex: 1;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .block {
    float: left;
    min-width: 250px;
  }
  .clear-left {
    clear: left;
  }
}
</style>
